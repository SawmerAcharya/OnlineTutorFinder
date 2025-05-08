// import express from "express";
// import { requestWithdrawal, processWithdrawal, getAllWithdrawals, getWithdrawalHistory } from "../controllers/withdrawalController.js";

// const withdrawalRouter = express.Router();

// // Tutor requests withdrawal
// withdrawalRouter.post("/withdrawals/request", requestWithdrawal);

// // Admin processes withdrawal
// withdrawalRouter.post("/withdrawals/process/:id", processWithdrawal);
// withdrawalRouter.get("/withdrawals/all", getAllWithdrawals);
// withdrawalRouter.get("/withdrawals/history", getWithdrawalHistory);

// export default withdrawalRouter;
import express from "express";
import { requestWithdrawal, processWithdrawal, getAllWithdrawals, getWithdrawalHistory, getTotalEarnings} from "../controllers/withdrawalController.js";

const withdrawalRouter = express.Router();

// Tutor requests withdrawal
withdrawalRouter.post("/withdrawals/request", requestWithdrawal);

// Admin processes withdrawal
withdrawalRouter.post("/withdrawals/process/:id", processWithdrawal);
withdrawalRouter.get("/withdrawals/all", getAllWithdrawals);
withdrawalRouter.get("/withdrawals/history", getWithdrawalHistory);
withdrawalRouter.get("/total-earnings", getTotalEarnings);

export default withdrawalRouter;