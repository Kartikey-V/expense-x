import Transaction from '../models/transaction.model.js';

const transactionResolver = {
	Query: {
		transactions: async (_, __, context) => {
			try {
				if (!context.getUser()) throw new Error('Unauthorized');
				const userId = await context.getUser()._id;

				const transactions = await Transaction.find({ userId });
				return transactions;
			} catch (err) {
				console.error('Error getting Transactions', err);
				throw new Error('Error getting transactions');
			}
		},
		transaction: async (_, { transactionId }, context) => {
			try {
				const transaction = await Transaction.findById({ _id: transactionId });
				return transaction;
			} catch (err) {
				console.error('Error getting Transaction', err);
				throw new Error('Error getting transaction');
			}
		},

		categoryStatistics: async (_, __, context) => {
			if (!context.getUser()) throw new Error('Unauthorized');

			const userId = context.getUser().id;
			const transactions = await Transaction.find({ userId });
			const categoryMap = {};

			transactions.forEach((transaction) => {
				if (!categoryMap[transaction.category]) {
					categoryMap[transaction.category] = 0;
				}
				categoryMap[transaction.category] += transaction.amount;
			});
			return Object.entries(categoryMap).map(([category, totalAmount]) => ({
				category,
				totalAmount,
			}));
		},
	},
	Mutation: {
		createTransaction: async (_, { input }, context) => {
			const { description, paymentType, category, amount, date, location } =
				input;
			if (
				!description ||
				!paymentType ||
				!category ||
				!amount ||
				!date ||
				!location
			) {
				throw new Error('All fields are required');
			}
			try {
				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});

				await newTransaction.save();
				return newTransaction;
			} catch (err) {
				console.error('Error creating Transaction', err);
				throw new Error('Error creating transaction');
			}
		},
		updateTransaction: async (_, { input }, context) => {
			try {
				const updatedTransaction = await Transaction.findByIdAndUpdate(
					input.transactionId,
					input,
					{ new: true }
				);
				return updatedTransaction;
			} catch (err) {
				console.error('Error updating Transaction', err);
				throw new Error('Error updating transaction');
			}
		},
		deleteTransaction: async (_, { transactionId }, context) => {
			try {
				const deletedTransaction = await Transaction.findByIdAndDelete(
					transactionId
				);
				return deletedTransaction;
			} catch (err) {
				console.error('Error deleting Transaction', err);
				throw new Error('Error deleting transaction');
			}
		},
	},
};

export default transactionResolver;
