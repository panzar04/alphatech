window.addEventListener("load", async () => {
    
    await setTimeout(() => { 
    document.getElementById('home-container').removeAttribute('hidden');
        document.getElementById("spinner").classList.add("d-none"); 
        //document.body.style.overflow = "auto";
    }, 750);
});