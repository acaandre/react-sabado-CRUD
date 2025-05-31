import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Edit() {
  const params = useParams(); //Para utilizar o ID via React Router
  const { id } = params;
  const [transactionDetails, setTransactionsDetails] = useState(null);

  console.log(params);

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

    <form className="flex flex-col gap-4 px-70 py-40">
      <div className="flex flex-col">
        <label htmlFor="Title">Title</label>
        <input
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="text"
          name="title"
          id="title"
          placeholder="Digite o nome da title"
          required
        />
      </div>

      <div>
        <label htmlFor="price">Preço</label>
        <input
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="price"
          name="price"
          id="price"
          placeholder="Digite o price"
          required
        />
      </div>

      <div>
        <label htmlFor="category">Categoria</label>
        <input
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="category"
          name="category"
          id="category"
          placeholder="Digite a categoria"
          required
        />
      </div>

      <div>
        <label htmlFor="transactionType">Tipo de Transação</label>
        <input
          className="block border-1 rounded-md w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          type="transactionType"
          name="transactionType"
          id="transactionType"
          placeholder="Digite o tipo de transação"
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
