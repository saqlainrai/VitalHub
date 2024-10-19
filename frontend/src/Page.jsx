import  { Component } from "react";
import './Page.css'
import CaloriesRequirmentForm from "./components/CaloriesRequirmentForm";
import WelcomeFoodFitness from "./components/WelcomeFoodFitness";
class Page extends Component {
  render() {
    return (
      <>
        
         <WelcomeFoodFitness/>
      </>
    );
  }
}

export default Page;
