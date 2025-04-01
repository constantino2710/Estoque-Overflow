import { useState } from "react";

export function Add() {
  const [value, setValue] = useState<number | ''>('');

  return (
    <div className='flex flex-col items-center h-screen'>
      <div>
	  <div className="">
      <label htmlFor="nome">
        Nome do produto:
      </label>
      <textarea
        id="descricao"
        rows={1}
        className="border rounded px-3 py-2 h-[5.3125rem] w-[33.125rem] resize-none"
      />
    </div>
		<label htmlFor="quantity">
		Quantidade:
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            setValue(newValue === '' ? '' : Number(newValue));
          }}
          className="border rounded px-2 py-1 w-[6.5625rem]"
        />
		</label>
      </div>
    </div>
  );
}
