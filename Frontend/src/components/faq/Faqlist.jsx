import { faqs } from "./../../assets/data/faqs";
import Faqitem from "./Faqitem";

const Faqlist = () => {
    return (
        <ul className="mt-[38px]">
            {faqs.map((item, index) => (
                <Faqitem item={item} key={index} />
            ))}
        </ul>
    );
};

export default Faqlist;