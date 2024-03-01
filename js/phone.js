const loadPhone = async (searchText , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone (phones , isShowAll);
    // console.log(phone);

} 

const displayPhone = (phones , isShowAll) => {
    // console.log(phone);

    // container call

    const phoneContainer = document.getElementById('phone-container');

    // clear container before adding new 

    phoneContainer.textContent = '';

    // hidden button add & remove
    const showAllContainer = document.getElementById('showall-container');
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }
    console.log('is show all', isShowAll)
    // slice info
    if(!isShowAll ){
      phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        console.log(phone);

        // creat a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-80 p-2 bg-gray-100 shadow-xl mx-10`;

        // set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-centre">
            <button onclick="showDetailsbtn('${phone.slug}')" class="btn btn-primary ">Show Details</button>
          </div>
        </div>
        `;
        // append child
        phoneContainer.appendChild(phoneCard);

    })  
    //  hide loading spinner
    toggleLoadingSpinner(false);
    
}


// handle search button

const handleSearch = (isShowAll) => {
  // loading spinner show
  toggleLoadingSpinner(true);
  // field value add
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText , isShowAll ); 
}

// loading spinner function
const toggleLoadingSpinner = (isloading) =>{
     const loadingSpinner = document.getElementById('loading-spinner');
     if(isloading){
      loadingSpinner.classList.remove('hidden');
     }
     else{
      loadingSpinner.classList.add('hidden');
     }

}

// handle Show All

const handleShowAll = () =>{
  handleSearch(true);
}
// show detail btn

const showDetailsbtn = async (id) =>{
  console.log('click show details' , id)
  //show single phn data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);

}

// show phn details 
const showPhoneDetails =(phone)=>{
  console.log(phone);
  // show modal in details
  show_details_modal.showModal();
}
