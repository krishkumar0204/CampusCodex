import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Card = (props) => {
  return (
    <>
      <div className="w-full p-5 md:p-4 rounded-xl hover:scale-95 duration-300 ease">
        {/* image  -> Top*/}
        <div className="mb-4 w-full">
          <img
            src={props.image}
            className="w-full h-32 md:h-28 object-cover rounded-lg"
          />
        </div>
        {/* Title + desc -> center  */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-neutral-800">
            {props.title}
          </h3>
          <p className="text-sm tracking-[0.4px] font-medium text-zinc-600">
            {props.des}
          </p>
        </div>
        {/* Bottom -> Link to resources  */}
        <div className="w-fit bg-yellow-300 px-3 py-1 rounded-xl flex items-center justify-center">
          <Link to="/resources" className="flex items-center text-neutral-800">
            Check Out <ArrowRight size={24} color="black" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
