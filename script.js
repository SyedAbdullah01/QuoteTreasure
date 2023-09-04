// Function to make sure that the JS is executed after loading the DOM HTML elements
document.addEventListener('DOMContentLoaded', function () {
    // Get references to various HTML elements
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote');
    const author = document.getElementById('author');
    const twitter = document.getElementById('twitter');
    const newQuoteBtn = document.getElementById('new-quote');
    const loader = document.getElementById('loader');

    // Array to store quotes from the API
    let apiQuotes = [];

    // Function to show the loading spinner and hide the quote container
    function showLoadingSpinner() {
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

    // Function to hide the loading spinner and show the quote container
    function removeLoadingSpinner() {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

    // Function to fetch quotes from the API
    async function getQuotes(callback) {
        const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
        
        // Show loading spinner while fetching quotes
        showLoadingSpinner();

        try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            // Execute the callback function after quotes are fetched
            callback();
        } catch (error) {
            console.log(error);
        }
    }

    // Function to display a new random quote
    function displayNewQuote() {
        getQuotes(() => {
            // Show loading spinner while fetching and displaying a new quote
            showLoadingSpinner();
            
            // Select a random quote from the fetched quotes
            const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
            
            // Display the quote text
            quoteText.textContent = quote.text;

            // Display the author (or "Unknown" if no author is provided)
            if (!quote.author) {
                author.textContent = 'Unknown';
            } else {
                author.textContent = "-" + quote.author;
                // Remove loading spinner after the quote is displayed
                removeLoadingSpinner();
            }

            // Check if the quote text is long and add a class if needed
            if (quoteText.text.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }
        });
    }

    // Function to tweet the current quote
    function tweet() {
        // Generate a tweet URL with the quote text and author
        const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
        
        // Open a new browser window or tab to tweet the quote
        window.open(tweetUrl, '_blank');
    }

    // Initial call to fetch and display a quote when the page loads
    getQuotes(displayNewQuote);

    // Event listeners for the "New Quote" button and the Twitter button
    newQuoteBtn.addEventListener('click', displayNewQuote);
    twitter.addEventListener('click', tweet);
});
