import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyCircleDollar,
  CurrencyDollar,
} from "phosphor-react";
import CardTransaction from "../components/Button/CardTransaction/CardTransaction";
import ModalNewTransaction from "../components/Button/ModalNewTransaction/ModalNewTransaction";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Button/Header/Header";
import AlertDelete from "../components/Button/AlertDelete/AlertDelete";


function TransactionsPage() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [index, setIndex] = useState(null);

  let navigate = useNavigate();
  
  function handleModal() {
    setOpen(true);
  }

  function handleDelete(id){
    setOpenDelete(true)
    setIndex(id)
  }

  const [allTransactions, setAllTransactions] = useState([]);

  async function fetchTransactions() {
    const transactions = await axios.get("http://localhost:3000/transactions");

    setAllTransactions(transactions.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function editTransaction(index) {
    navigate("/edit/" + index);
  }

  //fetchTransactions();

  // retorna a lista só das listas de deposit
  // const depositResult = allTransactions.filter((item)=>{return item.transactiontype === "deposit"})

  const depositResult = allTransactions.reduce((prev, current) => {
    if (current.transactionType === "deposit") {
      return prev + current.price;
    }
    return prev;
  }, 0);

  const withdrawResult = allTransactions.reduce((prev, current) => {
    if (current.transactionType === "withdraw") {
      return prev + current.price;
    }
    return prev;
  }, 0);

  let Result = depositResult - withdrawResult;

  console.log(allTransactions);

  console.log(depositResult);
  console.log(withdrawResult);

  async function deleteTransaction(index) {
    await axios.delete(`http://localhost:3000/transactions/${index}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header handleModal={handleModal}></Header>
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-24">
          <CardTransaction
            title="Entrada"
            background="bg-green-100"
            valor={depositResult}
            icon={<ArrowCircleUp className="text-green-500" size={32} />}
          />
          <CardTransaction
            title="Saída"
            background="bg-red-100"
            valor={withdrawResult}
            icon={<ArrowCircleDown className="text-red-500" size={32} />}
          />
          <CardTransaction
            title="Total"
            background="bg-green-900"
            valor={Result}
            textColor="text-white"
            icon={<CurrencyDollar size={32} />}
          />
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3 pb-4 font-medium">Título</th>
                <th className="px-6 py-3 pb-4 font-medium">Valor</th>
                <th className="px-6 py-3 pb-4 font-medium">Categoria</th>
                <th className="px-6 py-3 pb-4 font-medium">Data</th>
                <th className="px-6 py-3 pb-4 font-medium">Opções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allTransactions.map((transactions, index) => {
                return (
                  <tr className="hover:bg-gray-50 bg-white" key={index} >
                    <td className="px-6 py-4">{transactions.title}</td>
                    <td className="px-6 py-4 text-green-500 font-medium">
                      {transactions.price}
                    </td>
                    <td className="px-6 py-4">{transactions.category}</td>
                    <td className="px-6 py-4">{transactions.date}</td>
                    <td className="px-6 py-4 flex flex-row gap-3">
                      <button
                        onClick={()=>{handleDelete(transactions.id)}} //() => deleteTransaction(transactions.id)
                        className="py-2 px-3 font-medium bg-red-100 text-red-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Excluir
                      </button>
                      <button
                        onClick={() => editTransaction(transactions.id)}
                        className="py-2 px-3 font-medium bg-yellow-100 text-amber-900 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ModalNewTransaction open={open} setOpen={setOpen} />
        <AlertDelete openDelete={openDelete} setOpenDelete={setOpenDelete} index={index}></AlertDelete>
      </main>
    </div>
  );
}

export default TransactionsPage;
