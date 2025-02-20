import { useSelector } from "react-redux";
import useFormData from "../hooks/useFormData";
import { RootState } from "../store/store";
import { LANGUAGES } from "../types/languages";
import Button from "./Button";

type Props = {
  text: string;
  responseId: number;
};

const Response = ({ text, responseId }: Props) => {
  const isDetectionMessage = text
    .toLowerCase()
    .startsWith("detected language:");

  const { originalText, handleLanguageChange } = useFormData(text, responseId);

  const messages = useSelector((state: RootState) => state.chat.messages);
  const response = messages.find((msg) => msg.id === responseId);
  const detectedLanguage = response?.language;

  // const [chosenTranslate, setChosenTranslate] = useState(false);

  console.log(detectedLanguage, "response");

  return (
    <article className="text-token-text-primary w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
      <h6 className="sr-only">SlothUI said:</h6>
      <div className="m-auto py-[10px] text-base">
        <div className="flex flex-1 gap-4 text-base md:max-w-3xl md:gap-2 lg:max-w-[40rem] lg:gap-6 xl:max-w-[48rem]">
          <div className="relative flex w-full min-w-0 flex-col @xs/thread:px-0 @sm/thread:px-1.5 @md/thread:px-4">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-grow flex-col">
                <div className="text-message flex min-h-8 w-full flex-col items-end gap-2 text-start break-words whitespace-normal [.text-message+&]:mt-5">
                  <div className="flex w-full flex-col gap-1 first:pt-[3px] empty:hidden">
                    <div className="left w-[70%] border border-solid border-gray-200 bg-gray-200 p-2 break-words">
                      <p className="sentence-case mb-2">{originalText}</p>
                      {!isDetectionMessage && (
                        <div>
                          <Button>Translate</Button>
                          <Button>Summarize</Button>
                          <p>Translate to</p>
                          <form className="flex flex-wrap gap-3">
                            {LANGUAGES.map(({ id, label, value }) => {
                              return (
                                <label key={id} htmlFor={id}>
                                  <input
                                    type="radio"
                                    id={id}
                                    value={value}
                                    name={`language-${responseId}`}
                                    checked={detectedLanguage === value}
                                    onChange={handleLanguageChange}
                                  />
                                  <p
                                    className={`w-fit cursor-pointer rounded-2xl px-1.5 py-0.5 ${
                                      detectedLanguage === value
                                        ? "bg-blue-500 text-white"
                                        : "bg-greyish3"
                                    }`}
                                  >
                                    {label}
                                  </p>
                                </label>
                              );
                            })}
                          </form>
                        </div>
                      )}
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

export default Response;
