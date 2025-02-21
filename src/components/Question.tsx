const Question = ({ text }: { text: string }) => {
  return (
    <article className="text-token-text-primary w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <p className="sr-only">You said:</p>
      <div className="ml-auto max-w-3xl py-[10px] text-base">
        <div className="flex flex-col gap-2">
          <div className="right w-[70%] self-end border border-solid border-gray-200 bg-slate-100 p-2 break-words">
            <p className="sentence-case mb-2 whitespace-pre-wrap">
              {text}
            </p>{" "}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Question;
