const ErrorDisplay = ({
    errors,
}) => {
    return <div id="errors-display" className="border-2 rounded-md border-red-600 py-2 px-3 text-red-600 text-left mb-3 w-full">
        <h1 className="text-lg font-bold">Error</h1>
        <ol className="text-sm text-justify list-disc list-inside">
            {errors.map((error, index) =>
                <li key={index} className="pt-1">{error}</li>
            )}
        </ol>
    </div>
};

export default ErrorDisplay;