function CardTransaction({
  title,
  background,
  textColor = "text-black",
  icon,
  valor
}) {
  return (
    <div
      className={`rounded p-6 flex flex-col gap-2 shadow-md ${background} ${textColor}`}
    >
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {icon}
      </div>
      <strong className="text-3xl font-medium mt-1">R$ {valor} </strong>
    </div>
  );
}

export default CardTransaction;
