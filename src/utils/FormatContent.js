const formatContent = (text) => {
    // Check if the text is a string
    if (typeof text !== 'string') {
        console.error('Expected string but received:', text);
        return <span>No valid content available.</span>;
    }

    // Split and map to replace newlines with <br />
    return text.split('\n').map((item, index) => (
        <span key={index}>
            {item}
            <br />
        </span>
    ));
};


export default formatContent;