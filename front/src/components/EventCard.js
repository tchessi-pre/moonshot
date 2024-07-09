// src/components/EventCard.js

const EventCard = ({ image, title, subtitle, description, buttonText }) => (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-1/2">
            <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-between">
            <div>
                <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full inline-block mb-4">{subtitle}</div>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-lg text-orange-600 mb-4">{description}</p>
            </div>
            <div>
                <button className="text-blue-500 hover:underline">{buttonText}</button>
            </div>
        </div>
    </div>
);

export default EventCard;
