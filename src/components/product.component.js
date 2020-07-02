import React, { Component, useEffect, useState } from "react";
import ProductDataService from "../services/product.service";

// export default class Product extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.getProduct = this.getProduct.bind(this);
//     this.updatePublished = this.updatePublished.bind(this);
//     this.updateProduct = this.updateProduct.bind(this);
//     this.deleteProduct = this.deleteProduct.bind(this);

//     this.state = {
//       currentProduct: {
//         id: null,
//         title: "",
//         description: "",
//         published: false
//       },
//       message: ""
//     };
//   }

//   componentDidMount() {
//     this.getProduct(this.props.match.params.id);
//   }

//   onChangeTitle(e) {
//     const title = e.target.value;

//     this.setState(function(prevState) {
//       return {
//         currentProduct: {
//           ...prevState.currentProduct,
//           title: title
//         }
//       };
//     });
//   }

//   onChangeDescription(e) {
//     const description = e.target.value;
    
//     this.setState(prevState => ({
//       currentProduct: {
//         ...prevState.currentProduct,
//         description: description
//       }
//     }));
//   }

//   getProduct(id) {
//     console.log(id);
//     ProductDataService.get(id)
//       .then(response => {
//         this.setState({
//           currentProduct: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   updatePublished(status) {
//     var data = {
//       id: this.state.currentProduct.id,
//       title: this.state.currentProduct.title,
//       description: this.state.currentProduct.description,
//       published: status
//     };

//     ProductDataService.update(this.state.currentProduct.id, data)
//       .then(response => {
//         this.setState(prevState => ({
//           currentProduct: {
//             ...prevState.currentProduct,
//             published: status
//           }
//         }));
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   updateProduct() {
//     ProductDataService.update(
//       this.state.currentProduct.id,
//       this.state.currentProduct
//     )
//       .then(response => {
//         console.log(response.data);
//         this.setState({
//           message: "The product was updated successfully!"
//         });
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   deleteProduct() {    
//     ProductDataService.delete(this.state.currentProduct.id).then(response => {
//         console.log(response);
//         this.props.history.push('/product')
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { currentProduct } = this.state;

//     return (
//       <div>
//         {currentProduct ? (
//           <div className="edit-form">
//             <h4>Product</h4>
//             <form>
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   value={currentProduct.title}
//                   onChange={this.onChangeTitle}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   value={currentProduct.description}
//                   onChange={this.onChangeDescription}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>
//                   <strong>Status:</strong>
//                 </label>
//                 {currentProduct.published ? "Published" : "Pending"}
//               </div>
//             </form>

//             {currentProduct.published ? (
//               <button
//                 className="badge badge-primary mr-2"
//                 onClick={() => this.updatePublished(false)}
//               >
//                 UnPublish
//               </button>
//             ) : (
//               <button
//                 className="badge badge-primary mr-2"
//                 onClick={() => this.updatePublished(true)}
//               >
//                 Publish
//               </button>
//             )}

//             <button
//               className="badge badge-danger mr-2"
//               onClick={this.deleteProduct}
//             >
//               Delete
//             </button>

//             <button
//               type="submit"
//               className="badge badge-success"
//               onClick={this.updateProduct}
//             >
//               Update
//             </button>
//             <p>{this.state.message}</p>
//           </div>
//         ) : (
//           <div>
//             <br />
//             <p>Please click on a Product...</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }


const Product = props => {
 const initialProductState = {
    id :  null,
    title : "",
    description : "",
    brand : "",
    published :  false
 } ;

 const [currentProduct, setCurrentArtilce] = useState(initialProductState);
 const [message, setMessage] = useState("");

 const getProduct = id => {
  ProductDataService.get(id).then(
    response => {
      setCurrentArtilce(response.data);
      console.log(response.data);
    }).catch(
      e => {
        console.log(e);
      }
    ); 
; }


useEffect(()=>{
    getProduct(props.match.params.id);
}, [props.match.params.id]);

const handleInputChange =  event => {
  const {name , value} =  event.target;
  setCurrentArtilce({...currentProduct, [name] : value});
};

const updatePublished = status => {
  var data = {
     id: currentProduct.id,
      title: currentProduct.title,
      description: currentProduct.description,
      brand: currentProduct.brand,
      published: status
  };

  ProductDataService.update(currentProduct.id, data)
  .then(response => {
    setCurrentArtilce({...currentProduct,published:status});
    console.log(response.data);
  })
  .catch( e => {
    console.log(e);
  });
}

const updateProduct = () => {
  ProductDataService.update(currentProduct.id, currentProduct)
  .then(response => {
    console.log(response.data);
    setMessage("The product was updated successfully!");
  })
  .catch(e => {
    console.log(e);
  });
};

const deleteProduct= () => {
  ProductDataService.delete(currentProduct.id)
  .then( response => {
    console.log(response.data);
    props.history.push("/product");
  })
  .catch( e => {
    console.log(e);
  });
};

return(
  <div>
  {currentProduct ? (
    <div className="edit-form">
      <h4>Product</h4>
      <form>
        <div className="form-group">
          <label htmlFor="title">Merk</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={currentProduct.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={currentProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            value={currentProduct.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Status:</strong>
          </label>
          {currentProduct.published ? "Published" : "Pending"}
        </div>
      </form>

      {currentProduct.published ? (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(false)}
        >
          UnPublish
        </button>
      ) : (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(true)}
        >
          Publish
        </button>
      )}

      <button
        className="badge badge-danger mr-2"
        onClick={deleteProduct}
      >
        Delete
      </button>

      <button
        type="submit"
        className="badge badge-success"
        onClick={updateProduct}
      >
        Update
      </button>
      <p>{message}</p>
    </div>
  ) : (
    <div>
      <br />
      <p>Please click on a Product...</p>
    </div>
  )}
</div>
);
  }
export default Product;