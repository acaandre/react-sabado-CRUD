import { DialogTitle } from "@headlessui/react";
import ButtonTypeTransaction from "../Button/ButtonTypeTransaction/ButtonTypeTransaction";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";

export default function FormTransaction({
  handleChangeTitle,
  handleChangePrice,
  transactionType,
  handleClickTransactionType,
  handleChangeCategory,
  handleNewTransaction,
  titleValue = "",
  priceValue = "",
  categoryValue = "",
}) {
  function handleSubmit(e) {
    e.preventDefault();
    handleNewTransaction();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-5">
            Cadastrar transação
          </h1>
          <div className="mt-2 w-full space-y-5">
            <input
              value={titleValue}
              onChange={(ev) => {
                handleChangeTitle(ev.target.value);
              }}
              className="w-full h-[50px] bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Título"
            />
            <input
              value={priceValue}
              onChange={(ev) => {
                handleChangePrice(ev.target.value);
              }}
              className="w-full h-[50px] bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Preço"
            />
            <div className="flex justify-between">
              <ButtonTypeTransaction
                type={transactionType}
                isActive={transactionType === "deposit"}
                onClick={() => {
                  handleClickTransactionType("deposit");
                }}
              >
                <ArrowCircleUp
                  size={20}
                  className="text-emerald-500 font-bold"
                />{" "}
                Entrada
              </ButtonTypeTransaction>

              <ButtonTypeTransaction
                type={transactionType}
                isActive={transactionType === "withdraw"}
                onClick={() => {
                  handleClickTransactionType("withdraw");
                }}
              >
                <ArrowCircleDown size={20} className="text-red-500 font-bold" />{" "}
                Saída
              </ButtonTypeTransaction>
            </div>
            <div className="w-full">
              <input
                value={categoryValue}
                onChange={(ev) => {
                  handleChangeCategory(ev.target.value);
                }}
                className="w-full h-[50px] bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Categoria"
              />
            </div>
          </div>

          {/* ✅ Botão de envio */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className=" bg-pink-600 hover:bg-pink-800 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
