import { Bookmark } from "lucide-react";

const NotesCard = ({
  _id,
  thumbnail,
  title,
  description,
  pdf,
  onSave,
  isSaved,
}) => {
  return (
    <>
      <div className="h-full bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg hover:scale-95 duration-300 ease">
        <img src={thumbnail} alt={title} className="h-40 w-full object-cover" />

        <div className="p-4">
          <h3 className="text-lg font-semibold break-words">{title}</h3>
          <p className="text-gray-400 text-sm break-words">{description}</p>

          <div className="flex items-center justify-between gap-3 mt-4">
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 px-3 py-1 rounded text-sm cursor-pointer"
            >
              view
            </a>

            <button onClick={() => onSave?.(_id)}>
              <Bookmark
                className={isSaved ? "text-yellow-400" : "text-gray-400"}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesCard;
