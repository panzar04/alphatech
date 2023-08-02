        //animate when in view
        const inViewport = (className) => {
            let allElements = document.getElementsByClassName(className);
            let windowHeight = window.innerHeight;
            const elems = () => {
                for (let i = 0; i < allElements.length; i++) {  //  loop through the elements with the specified class
                    let viewportOffset = allElements[i].getBoundingClientRect();  //  returns the size of an element and its position relative to the viewport
                    let top = viewportOffset.top;  //  get the offset top
                    if (top < windowHeight) {  //  if the top offset is less than the window height
                        allElements[i].classList.remove('invisible');
                        allElements[i].classList.add('animate', 'from-left');  //  add the class
                    }
                }
            };
            elems();
            window.addEventListener('scroll', elems);
        };
        
        inViewport('pics-l'); // Replace 'your-class-name' with the class name of the elements you want to target
        


                //animate when in view
                const inViewport2 = (className) => {
                    let allElements = document.getElementsByClassName(className);
                    let windowHeight = window.innerHeight;
                    const elems = () => {
                        for (let i = 0; i < allElements.length; i++) {  //  loop through the elements with the specified class
                            let viewportOffset = allElements[i].getBoundingClientRect();  //  returns the size of an element and its position relative to the viewport
                            let top = viewportOffset.top;  //  get the offset top
                            if (top < windowHeight) {  //  if the top offset is less than the window height
                                allElements[i].classList.remove('invisible');
                                allElements[i].classList.add('animate', 'from-right');  //  add the class
                            }
                        }
                    };
                    elems();
                    window.addEventListener('scroll', elems);
                };
                
                inViewport2('pics-r'); // Replace 'your-class-name' with the class name of the elements you want to target

                                //animate when in view
                const inViewport3 = (className) => {
                    let allElements = document.getElementsByClassName(className);
                    let windowHeight = window.innerHeight;
                    const elems = () => {
                        for (let i = 0; i < allElements.length; i++) {  //  loop through the elements with the specified class
                            let viewportOffset = allElements[i].getBoundingClientRect();  //  returns the size of an element and its position relative to the viewport
                            let top = viewportOffset.top;  //  get the offset top
                            if (top < windowHeight) {  //  if the top offset is less than the window height
                                allElements[i].classList.remove('invisible');
                                allElements[i].classList.add('animate', 'glow');  //  add the class
                            }
                        }
                    };
                    elems();
                    window.addEventListener('scroll', elems);
                };
                
                inViewport3('tekst'); // Replace 'your-class-name' with the class name of the elements you want to target