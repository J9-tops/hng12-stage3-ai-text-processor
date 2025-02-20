const Question = ({ text }: { text: string }) => {
  return (
    <article
      className="text-token-text-primary w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
      dir="auto"
    >
      <h5 className="sr-only">You said:</h5>
      <div className="px-2 py-[18px] text-base">
        <div className="ml-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-5 lg:max-w-[40rem] lg:gap-6 xl:max-w-[48rem]">
          <div className="group/conversation-turn relative flex w-full min-w-0 flex-col @xs/thread:px-0 @sm/thread:px-1.5 @md/thread:px-4">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-grow flex-col">
                <div className="text-message flex min-h-8 w-full flex-col items-end gap-2 text-start break-words whitespace-normal [.text-message+&]:mt-5">
                  <div className="flex w-full flex-col items-end gap-1 empty:hidden rtl:items-start">
                    <div className="right relative max-w-[var(--user-chat-width,70%)] rounded-3xl bg-slate-100 px-5 py-2.5">
                      <p className="whitespace-pre-wrap">{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Question;
