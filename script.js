// Function to make sure that the JS is executed after loading the DOM HTML elements
document.addEventListener('DOMContentLoaded', function () {
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote');
    const author = document.getElementById('author');
    const twitter = document.getElementById('twitter');
    const newQuoteBtn = document.getElementById('new-quote');
    const loader = document.getElementById('loader');

    // Get Quotes From API
    let apiQuotes = [];

    function showLoadingSpinner(){
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

    function removeLoadingSpinner(){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

    async function getQuotes(callback) {
        const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
        showLoadingSpinner(); 
        try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            callback();
        } catch (error) {
            console.log(error);
        }
    }

    function displayNewQuote() {
        getQuotes(() => {
            showLoadingSpinner(); 
            const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
            quoteText.textContent = quote.text;

            if(!quote.author){
                    author.textContent = 'Unknown';
            }else{
                author.textContent = "-" + quote.author;
                removeLoadingSpinner();
            }

            if(quoteText.text.length > 120){
                quoteText.classList.add('long-quote');
            }
            else{
                quoteText.classList.remove('long-quote');
            }
        });
    }

    // Tweet Quote
    function tweet(){
        const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
        window.open(tweetUrl, '_blank');
    }

    getQuotes(displayNewQuote);

    newQuoteBtn.addEventListener('click', displayNewQuote);
    twitter.addEventListener('click', tweet);
});