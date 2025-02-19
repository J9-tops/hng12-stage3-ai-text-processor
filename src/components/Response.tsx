import useFormData from "../hooks/useFormData";
import { LANGUAGES } from "../types/languages";

type Props = {
  text: string;
};

const Response = ({ text }: Props) => {
  const isDetectionMessage = text
    .toLowerCase()
    .startsWith("detected language:");
  const {
    originalText,
    translatedText,
    handleLanguageChange,
    selectedLanguage,
  } = useFormData(text);
  return (
    <article className="text-token-text-primary w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <h6 className="sr-only">SlothUI said:</h6>
      <div className="m-auto px-6 py-[18px] text-base">
        <div className="mx-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-5 lg:max-w-[40rem] lg:gap-6 xl:max-w-[48rem]">
          <div className="group/conversation-turn agent-turn relative flex w-full min-w-0 flex-col @xs/thread:px-0 @sm/thread:px-1.5 @md/thread:px-4">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-grow flex-col">
                <div className="text-message flex min-h-8 w-full flex-col items-end gap-2 text-start break-words whitespace-normal [.text-message+&]:mt-5">
                  <div className="flex w-full flex-col gap-1 first:pt-[3px] empty:hidden">
                    <div className="w-full break-words">
                      <p>
                        {selectedLanguage === "en"
                          ? originalText
                          : translatedText || originalText}
                      </p>
                    </div>
                    {!isDetectionMessage && (
                      <form className="flex w-60 flex-wrap gap-3">
                        {LANGUAGES.map(({ id, label, value }) => (
                          <label key={id} htmlFor={id} className="text-sm">
                            <input
                              type="radio"
                              id={id}
                              value={value}
                              name="language"
                              checked={selectedLanguage === value}
                              onChange={handleLanguageChange}
                              hidden
                            />
                            <p className="bg-greyish3 w-fit cursor-pointer rounded-2xl px-1.5 py-0.5">
                              {label}
                            </p>
                          </label>
                        ))}
                      </form>
                    )}
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

export default Response;
