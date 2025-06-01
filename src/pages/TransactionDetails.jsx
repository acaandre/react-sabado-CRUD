import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Button/Header/Header";
import FormTransaction from "../components/FormTransaction/FormTransaction";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("");

  function handleChangeTitle(value) {
    setTitle(value);
  }

  function handleClickTransactionType(value) {
    setTransactionType(value);
  }

  function handleChangeCategory(value) {
    setCategory(value);
  }

  function handleChangePrice(value) {
    setPrice(value);
  }

  async function fetchTransactionId() {
    try {
      const response = await axios.get(`http://localhost:3000/transactions/${id}`);
      const transaction = response.data;

      setTitle(transaction.title);
      setPrice(transaction.price);
      setCategory(transaction.category);
      setTransactionType(transaction.transactionType);
    } catch (error) {
      console.error("Erro ao buscar transação:", error);
    }
  }

  async function handleEditTransaction() {
    const updatedTransaction = {
      title,
      price: Number(price),
      category,
      transactionType,
      date: new Date().toLocaleDateString("pt-BR") // atualiza com a data atual
    };

    try {
      await axios.put(`http://localhost:3000/transactions/${id}`, updatedTransaction);
      navigate("/transactions");
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
    }
  }

  useEffect(() => {
    fetchTransactionId();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header showButton={false} />
      <main className="max-w-3xl mx-auto px-6 py-8 bg-white -mt-24 rounded-lg shadow-lg">
        <FormTransaction
          titleValue={title}
          priceValue={price}
          categoryValue={category}
          transactionType={transactionType}
          handleChangeTitle={handleChangeTitle}
          handleChangePrice={handleChangePrice}
          handleChangeCategory={handleChangeCategory}
          handleClickTransactionType={handleClickTransactionType}
          handleNewTransaction={handleEditTransaction}
        />
      </main>
    </div>
  );
}
