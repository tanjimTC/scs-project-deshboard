import React from "react";
import "../SignIn/SignIn.css";
import { useForm } from "react-hook-form";
import { db } from "../../firebase.config";

const AddAdmin = () => {
  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (data, e) => {
    console.log(data);

    const userrr = db.collection("users").where("email", "==", data.email);
    console.log("called", userrr);
    userrr
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          db.collection("users")
            .doc(doc.id)
            .update({
              isAdmin: true,
            })
            .then(function (docRef) {
              e.target.reset();
              // window.location.reload();
            })
            .catch(function (error) {
              alert("error");
              console.log("Error adding document: ", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <h2 className="card-title text-center">
              Make Admin <i className="fas fa-sign-in-alt"></i>
            </h2>
            <div className="card-body py-md-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    ref={register({
                      required: "This Field is required!",
                    })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className="d-flex align-items-center justify-content-end">
                  <input className="btn signBtn px-3" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
