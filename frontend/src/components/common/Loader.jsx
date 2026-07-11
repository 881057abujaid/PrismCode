const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-primary"></div>
            <p className="mt-4 text-text-primary">{text}</p>
        </div>
    );
};

export default Loader;