import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useBalance } from "../hooks/useBalance";
export default function BalanceComponent() {
  const {data:balance} = useBalance();
  let [isOpen, setIsOpen] = useState(false); // State to control dialog visibility
  
  let [topUpAmount, setTopUpAmount] = useState(""); // Amount to top up

  

  // Function to open the dialog
  function open() {
    setIsOpen(true);
  }

  // Function to close the dialog
  function close() {
    setIsOpen(false);
  }

  // Function to generate the HMAC-SHA256 signature
  function getEsewaPaymentHash(amount, transaction_uuid) {
  const secretKey = "8gBm/:&EnhH.1/q";
  
  // Construct the data string in correct format
  const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;

  // Generate HMAC-SHA256 hash
  const hash = CryptoJS.HmacSHA256(data, secretKey);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return {
    signature: hashInBase64,
    signed_field_names: "total_amount,transaction_uuid,product_code",
  };
}
    

  // Function to handle the top-up (redirecting to eSewa)
  async function handleTopUp() {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
  
    const totalAmount = amount + 10; // Total with tax
    const taxAmount = 10; // Example tax amount
    const productCode = "EPAYTEST";
  
    try {
      // Make a POST request to the backend to create a transaction and fetch the transactionUUID
      const response = await axios.post('http://localhost:5001/api/payments/createTransaction', {
        totalAmount,
        taxAmount,
        amount,
      }, { withCredentials: true }); // Include credentials (cookies)
  
      if (response.data.success) {
        const transactionUUID = response.data.transactionUUID; // Get the transactionUUID from response
  
        // Generate the correct HMAC signature
        const signature = getEsewaPaymentHash(totalAmount, transactionUUID).signature;
  
        // Create a form dynamically
        const form = document.createElement("form");
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        form.method = "POST";
        form.target = "_blank"; // Open in a new tab
  
        const formData = {
          amount: amount,
          tax_amount: taxAmount, // Example tax amount
          total_amount: totalAmount, // Total amount including tax
          transaction_uuid: transactionUUID, // Unique transaction ID
          product_code: productCode, // Product code
          product_service_charge: 0,
          product_delivery_charge: 0,
          success_url: "http://localhost:5001/api/payments/complete-payment",
          failure_url: "https://developer.esewa.com.np/failure",
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature: signature, // HMAC-SHA256 signature
        };
  
        console.log(formData);
  
        // Append hidden inputs to the form
        Object.keys(formData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        });
  
        document.body.appendChild(form);
        form.submit(); // Submit the form to redirect user to eSewa
        setTopUpAmount(""); // Clear input field after top-up
        close(); // Close the dialog
      } else {
        alert('Failed to create transaction');
      }
    } catch (error) {
      console.error('Error during top-up:', error);
      alert('An error occurred while processing the top-up');
    }
  }

  return (
    <>
      {/* Display Balance button */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={open}
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-md"
        >
          Balance: {balance} NPR
        </Button>
      </div>

      {/* Dialog for balance top-up */}
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl p-6 bg-foreground duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Add Balance
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Your current Balance is : NPR {balance}
              </p>

              {/* Top-Up Form */}
              <div className="mt-4">
                <div className="mb-4">
                  <label htmlFor="topUpAmount" className="block text-sm text-white">
                    Enter Amount to Top Up:
                  </label>
                  <input
                    id="topUpAmount"
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-md text-gray-800"
                    placeholder="Enter amount"
                  />
                </div>

                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleTopUp} // Handle top-up
                >
                  Add Funds
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
