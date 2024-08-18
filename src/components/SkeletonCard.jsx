const SkeletonCard = () => {
    return (
        <div className="flex flex-col border border-[#ddd] rounded-xl p-4 overflow-hidden">
            <div className="flex items-center rounded-xl justify-center h-[130px] mb-4 bg-gray-300 animate-pulse"></div>
            <div className="flex items-center justify-between mb-4">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex-1 text-center">
                    <div className="h-4 bg-gray-300 rounded-full animate-pulse mb-2 w-2/3 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded-full animate-pulse w-1/2 mx-auto"></div>
                </div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
