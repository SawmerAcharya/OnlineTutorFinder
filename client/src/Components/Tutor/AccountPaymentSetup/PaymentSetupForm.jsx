import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, User, Building, Info } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../../../Context/AppContex";

// Reusable Input Component
const FormInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  error,
  hint,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
        {icon && <span className="text-indigo-500">{icon}</span>}
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors`}
      />
      {hint && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Step Indicator Component
const StepItem = ({ number, title, isActive, isCompleted }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            : isCompleted
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {number}
      </div>
      <span
        className={`font-medium ${
          isActive ? "text-indigo-600" : "text-gray-600"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default function PaymentSetupForm() {
  const { tutorId: routeTutorId } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  const storedTutorId = localStorage.getItem("tutorId");
  const tutorId = userData?._id || storedTutorId || routeTutorId || null;

  useEffect(() => {
    console.log("User Data in payment:", userData);
    console.log("Final Tutor ID used in payment:", tutorId);
  }, [userData, routeTutorId]);

  const validateField = (name, value) => {
    switch (name) {
      case "accountHolderName":
        if (!value) return "Account holder name is required.";
        if (value.length < 3) return "Name must be at least 3 characters.";
        break;
      case "bankName":
        if (!value) return "Bank name is required.";
        break;
      case "accountNumber":
        if (!value) return "Account number is required.";
        if (!/^\d{8,20}$/.test(value))
          return "Account number must be 8-20 digits.";
        break;
      default:
        return "";
    }
    return "";
  };

  const validateStep = (fields) => {
    const newErrors = {};
    for (const field of fields) {
      newErrors[field] = validateField(field, formData[field]);
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    setTouched((prev) => ({
      ...prev,
      ...fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}),
    }));
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleNext = async () => {
    if (step === 1 && validateStep(["accountHolderName", "bankName"])) {
      setStep(2);
    } else if (step === 2 && validateStep(["accountNumber"])) {
      const token = localStorage.getItem("token");
      if (!tutorId || !token) {
        toast.error("User not logged in. Please log in and try again.");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:5001/api/user/tutors/${tutorId}/payment-info`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Banking info saved successfully!");
        setTimeout(() => {
          navigate("/tutor");
        }, 1000);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        toast.error("There was an error submitting your info.");
      }
    }
  };

  const handleBack = () => setStep(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            Payment Setup
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Set up your payment details to start receiving payments. Your
            information is encrypted and securely stored.
          </p>
        </div>

        <div className="mt-4 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-100">
            <div
              className={`h-full ${
                step === 1 ? "w-1/2" : "w-full"
              } bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300`}
            ></div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="bg-blue-50 p-6 w-full md:w-80">
              <div className="mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">Rs</span>
                </div>
                <h2 className="text-xl font-bold text-center mt-4">
                  Secure Payments
                </h2>
                <p className="text-gray-600 text-center mt-2">
                  Your banking information is encrypted and securely stored.
                </p>
              </div>

              <div className="space-y-4">
                <StepItem
                  number={1}
                  title="Account Information"
                  isActive={step === 1}
                  isCompleted={step > 1}
                />
                <StepItem
                  number={2}
                  title="Banking Details"
                  isActive={step === 2}
                  isCompleted={false}
                />
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-gray-700">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Bank-level security</span>
              </div>
            </div>

            <div className="p-6 flex-1">
              <div className="max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                  {step === 1 ? "Account Information" : "Banking Details"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {step === 1
                    ? "Let's start with some basic information about your account."
                    : "Enter your banking details to receive payments."}
                </p>

                {step === 1 && (
                  <>
                    <FormInput
                      label="Account Holder Name"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      icon={<User size={20} />}
                      error={
                        touched.accountHolderName
                          ? errors.accountHolderName
                          : ""
                      }
                      hint="Enter the name exactly as it appears on your bank account."
                    />
                    <FormInput
                      label="Bank Name"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Chase, Wells Fargo, etc."
                      icon={<Building size={20} />}
                      error={touched.bankName ? errors.bankName : ""}
                      className="mt-6"
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="p-4 rounded-lg border bg-emerald-50 border-emerald-200 mb-6 flex items-start gap-3">
                      <Shield size={20} className="text-emerald-500 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-emerald-700">
                          Secure Info
                        </h3>
                        <p className="text-sm text-emerald-600">
                          Your account details are encrypted with bank-level
                          security.
                        </p>
                      </div>
                    </div>

                    <FormInput
                      label="Account Number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter the account number"
                      icon={<Info size={16} />}
                      error={touched.accountNumber ? errors.accountNumber : ""}
                    />

                    {formData.accountHolderName &&
                      formData.bankName &&
                      formData.accountNumber.length >= 8 && (
                        <div className="mt-6 bg-gray-50 p-4 border rounded-lg">
                          <h3 className="text-base font-medium text-gray-800 mb-2">
                            Review Your Info
                          </h3>
                          <dl className="text-sm text-gray-700 space-y-2">
                            <div className="flex justify-between">
                              <dt>Account Holder:</dt>
                              <dd className="font-medium">
                                {formData.accountHolderName}
                              </dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Bank Name:</dt>
                              <dd className="font-medium">
                                {formData.bankName}
                              </dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Account Number:</dt>
                              <dd className="font-medium">
                                {formData.accountNumber}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      )}
                  </>
                )}

                <div className="flex gap-4 mt-8">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer"
                    disabled={
                      (step === 1 &&
                        (!formData.accountHolderName || !formData.bankName)) ||
                      (step === 2 && formData.accountNumber.length < 8)
                    }
                  >
                    {step === 1 ? "Continue" : "Complete Setup"}
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    By submitting this form, you agree to our{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}