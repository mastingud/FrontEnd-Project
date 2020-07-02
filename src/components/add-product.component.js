import React, { Component, useState } from "react";
import ProductDataService from "../services/product.service";
import AuthService from "../services/auth.service";


// export default class AddProduct extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.saveProduct = this.saveProduct.bind(this);
//     this.newProduct = this.newProduct.bind(this);

//     this.state = {
//       id: null,
//       title: "",
//       description: "", 
//       published: false,
//       userId : AuthService.getCurrentUser().id,
//       submitted: false
//     };
//   }

//   onChangeTitle(e) {
//     this.setState({
//       title: e.target.value
//     });
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     });
//   }

//   saveProduct() {
//     var data = {
//       title: this.state.title,
//       description: this.state.description,
//       userId : this.state.userId
//     };

//     ProductDataService.create(data)
//       .then(response => {
//         this.setState({
//           id: response.data.id,
//           title: response.data.title,
//           description: response.data.description,
//           published: response.data.published,
//           userId: response.data.userId,
//           submitted: true
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   newProduct() {
//     this.setState({
//       id: null,
//       title: "",
//       description: "",
//       published: false,
//       userId : AuthService.getCurrentUser().id,
//       submitted: false
//     });
//   }

//   render() {
//     return (
//       <div className="submit-form">
//         {this.state.submitted ? (
//           <div>
//             <h4>You submitted successfully!</h4>
//             <button className="btn btn-success" onClick={this.newProduct}>
//               Add
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 required
//                 value={this.state.title}
//                 onChange={this.onChangeTitle}
//                 name="title"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="description"
//                 required
//                 value={this.state.description}
//                 onChange={this.onChangeDescription}
//                 name="description"
//               />
//             </div>

//             <button onClick={this.saveProduct} className="btn btn-success">
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }

// }


const AddProduct = () => {

  const initialProductState = {
    id: null,
    title: "",
    description: "", 
    brand: "",
    published: false,
    userId : AuthService.getCurrentUser().id,

  };

  const [product , setProduct]  = useState(initialProductState);
  const [submitted , setSubmitterd] = useState(false);

  const handleInputChange = event => {
      const {name , value} = event.target;
      setProduct({...product, [name] :  value});
  };

  const saveProduct = () => {
    var data = {
      title : product.title,
      description : product.description,
      brand : product.brand,
      userId : AuthService.getCurrentUser().id,
    };

    ProductDataService.create(data).then(
      response => {
        setProduct({
          id : response.data.id,
          title : response.data.title,
          description : response.data.description,
          brand : response.data.brand,
          published : response.data.published

        });

        setSubmitterd(true);
        console.log(response.data);
      }).catch( e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitterd(false);

  };

  return(
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newProduct}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Merk</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={product.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={product.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            required
            value={product.brand}
            onChange={handleInputChange}
            name="brand"
          />
        </div>

        <button onClick={saveProduct} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  );
};

export default AddProduct;