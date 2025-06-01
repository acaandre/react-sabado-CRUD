import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [transactionDetails, setTransactionsDetails] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("");

  // Atualiza os estados depois que os dados forem carregados
  useEffect(() => {
    async function getTransaction() {
      const response = await axios.get(`http://localhost:3000/transactions/${id}`);
      setTransactionsDetails(response.data);
    }

    getTransaction();
  }, [id]);

  // Quando os dados forem carregados, atualiza os estados
  useEffect(() => {
    if (transactionDetails) {
      setTitle(transactionDetails.title);
      setPrice(transactionDetails.price);
      setCategory(transactionDetails.category);
      setTransactionType(transactionDetails.transactionType);
    }
  }, [transactionDetails]);

  async function putTransaction(event) {
    event.preventDefault();
  
    const updateEdit = {
      title: title,
      price: Number(price),
      category: category,
      transactionType: transactionType,
      date: new Date().toLocaleDateString("pt-BR") // 🕒 Adiciona a data atual no momento da edição
    };
  
    await axios.put(`http://localhost:3000/transactions/${id}`, updateEdit);
  
    navigate("/transactions");
  }

  return (
    <form className="flex flex-col gap-4 px-70 py-40" onSubmit={putTransaction}>
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
          className="block border-1 rounded-md w-full py-1.5 pr-3 pl-1 text-base text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="price">Preço</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          required
          className="block border-1 rounded-md w-full py-1.5 pr-3 pl-1 text-base text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="category">Categoria</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          required
          className="block border-1 rounded-md w-full py-1.5 pr-3 pl-1 text-base text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="transactionType">Tipo de Transação</label>
        <input
          type="text"
          id="transactionType"
          name="transactionType"
          value={transactionType}
          onChange={(ev) => setTransactionType(ev.target.value)} // ✅ Corrigido aqui
          required
          className="block border-1 rounded-md w-full py-1.5 pr-3 pl-1 text-base text-gray-900"
        />
      </div>

      <div className="flex flex-row-reverse w-full gap-3">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          Editar
        </button>

        <button
          type="reset"
          className="px-4 py-2 text-whiteb bg-amber-300 rounded-lg hover:bg-amber-600"
          onClick={()=>{navigate("/transactions");}}
        >
          Voltar
        </button>

      </div>
    </form>
  );
}
