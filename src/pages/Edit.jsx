import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

export default function Edit() {

  const navigate = useNavigate();
  const params = useParams(); //Para utilizar o ID via React Router
  const { id } = params;
  const [transactionDetails, setTransactionsDetails] = useState(null);

  const [title, setTitle] = useState(transactionDetails?.title);
  const [price, setPrice] = useState(transactionDetails?.price);
  const [category, setCategory] = useState(transactionDetails?.category);
  const [transactionType, setTransactionType] = useState(
    transactionDetails?.transactionType
  );

  function handleChangeTransactionType(ev) {
    setTransactionType(ev);
  }

  function handleChangeTitle(ev) {
    setTitle(ev);
  }

  function handleChangePrice(ev) {
    setPrice(ev);
  }

  function handleChangeCategory(ev) {
    setCategory(ev);
  }

  

  async function putTransaction(event) {
    event.preventDefault;

    const updateEdit = {
      title: title,
      price: Number(price),
      category: category,
      transactionType: transactionType
    };

    await axios.put(`http://localhost:3000/transactions/${id}`, updateEdit);

    navigate("/transactions");
  }

  console.log(params);

  console.log(setPrice);

  async function getTransaction() {
    const transactionsID = await axios.get(
      `http://localhost:3000/transactions/${id}`
    );

    setTransactionsDetails(transactionsID.data);
    console.log(transactionsID);
  }

  console.log(transactionDetails);

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    //<h1>Detalhes do {id}</h1>

    <form className="flex flex-col gap-4 px-70 py-40" onSubmit={putTransaction}>
      <div className="flex flex-col">
        <label htmlFor="Title">Title</label>
        <input
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="text"
          name="title"
          id="title"
          placeholder="Digite o nome da title"
          defaultValue={transactionDetails?.title}
          onChange={(ev) => {
            handleChangeTitle(ev.target.value);
          }}
          required
        />
      </div>

      <div>
        <label htmlFor="price">Preço</label>
        <input
          onChange={(ev) => {
            handleChangePrice(ev.target.value);
          }}
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="price"
          name="price"
          id="price"
          defaultValue={transactionDetails?.price}
          placeholder="Digite o price"
          required
        />
      </div>

      <div>
        <label htmlFor="category">Categoria</label>
        <input
          onChange={(ev) => {
            handleChangeCategory(ev.target.value);
          }}
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="category"
          name="category"
          id="category"
          placeholder="Digite a categoria"
          defaultValue={transactionDetails?.category}
          required
        />
      </div>

      <div>
        <label htmlFor="transactionType">Tipo de Transação</label>
        <input
          onChange={(ev) => {
            handleChangeTransactionType(ev.target.transactionType);
          }}
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="transactionType"
          name="transactionType"
          id="transactionType"
          placeholder="Digite o tipo de transação"
          defaultValue={transactionDetails?.transactionType}
          required
        />
      </div>

      <div className="flex flex-row-reverse w-full">
        <button
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          type="submit"
        >
          Editar
        </button>
      </div>
    </form>
  );
}
