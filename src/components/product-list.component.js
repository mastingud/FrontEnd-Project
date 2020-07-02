import React, { Component, useState, useEffect } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

// export default class ProductList extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
//     this.retrieveProduct = this.retrieveProduct.bind(this);
//     this.refreshList = this.refreshList.bind(this);
//     this.setActiveProduct = this.setActiveProduct.bind(this);
//     this.removeAllProduct = this.removeAllProduct.bind(this);
//     this.searchTitle = this.searchTitle.bind(this);

//     this.state = {
//       product: [],
//       currentProduct: null,
//       currentIndex: -1,
//       searchTitle: ""
//     };
//   }

//   componentDidMount() {
//     this.retrieveProduct();
//   }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

//   retrieveProduct() {
//     ProductDataService.getUser(AuthService.getCurrentUser().id)
//       .then(response => {
//         this.setState({
//           product: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   refreshList() {
//     this.retrieveProduct();
//     this.setState({
//       currentProduct: null,
//       currentIndex: -1
//     });
//   }

//   setActiveProduct(product, index) {
//     this.setState({
//       currentProduct: product,
//       currentIndex: index
//     });
//   }

//   removeAllProduct() {
//     console.log("tets");
//     ProductDataService.deleteUser(AuthService.getCurrentUser().id)
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   searchTitle() {
//     ProductDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           product: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { searchTitle, product, currentProduct, currentIndex } = this.state;

//     return (
//       <div className="list row">
//         <div className="col-md-8">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by title"
//               value={searchTitle}
//               onChange={this.onChangeSearchTitle}
//             />
//             <div className="input-group-append">
//               <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={this.searchTitle}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <h4>Products List</h4>

//           <ul className="list-group">
//             {product &&
//               product.map((arc, index) => (
//                 <li
//                   className={
//                     "list-group-item " +
//                     (index === currentIndex ? "active" : "")
//                   }
//                   onClick={() => this.setActiveProduct(arc, index)}
//                   key={index}
//                 >
//                   {arc.title}
//                 </li>
//               ))}
//           </ul>

//           <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllProduct}>
//             Remove All
//           </button>
//         </div>
//         <div className="col-md-6">
//           {currentProduct ? (
//             <div>
//               <h4>Product</h4>
//               <div>
//                 <label>
//                   <strong>Title:</strong>
//                 </label>{" "}
//                 {currentProduct.title}
//               </div>
//               <div>
//                 <label>
//                   <strong>Description:</strong>
//                 </label>{" "}
//                 {currentProduct.description}
//               </div>
//               <div>
//                 <label>
//                   <strong>Status:</strong>
//                 </label>{" "}
//                 {currentProduct.published ? "Published" : "Pending"}
//               </div>

//               <Link
//                 to={"/product/" + currentProduct.id}
//                 className="badge badge-warning"
//               >
//                 Edit
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <br />
//               <p>Please click on a Product...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }


const ProductList = () => {
  const [products , setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] =  useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchTitle = e =>{
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
  };

  const retrieveProducts = () => {
    ProductDataService.getUser(AuthService.getCurrentUser().id)
    .then( response => {
      setProducts(response.data);
      console.log(response.data);
    }).catch( e=> {
      console.log(e);
    });
 
  };

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };


  const setActiveProduct = (product, index) => {
    setCurrentIndex(index);
    setCurrentProduct(product);
  };

  const removeAllProduct = () => {
    ProductDataService.deleteUser(AuthService.getCurrentUser().id)
    .then(response => {
      console.log(response.data);
      refreshList();
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByTitle = () => {
    ProductDataService.findByTitle(searchTitle)
    .then( response => {
      setProducts(response.data);
      console.log(response.data);
    })
    .catch( e => {
      console.log(e);
    });
 
  };



  return ( 
<div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Products List</h4>

      <ul className="list-group">
        {products &&
          products.map((arc, index) => (
            <li
              className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveProduct(arc, index)}
              key={index}
            >
              {arc.title}
            </li>
          ))}
      </ul>

      <button className="m-3 btn btn-sm btn-danger" onClick={removeAllProduct}>
        Remove All
      </button>
    </div>
    <div className="col-md-6">
      {currentProduct ? (
        <div>
          <h4>Product</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentProduct.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentProduct.description}
          </div>
          <div>
            <label>
              <strong>Brand:</strong>
            </label>{" "}
            {currentProduct.brand}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentProduct.published ? "Published" : "Pending"}
          </div>

          <Link
            to={"/product/" + currentProduct.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
</div>
);

};


export default ProductList;