import {DeliverySection} from "./DeliverySection/DeliverySection.jsx";
import {Guarantees} from "./Guarantees/Guarantees.jsx";
import {PopularQuestions} from "./PopularQuestions/PopularQuestions.jsx";
import {Original} from "./Original/Original.jsx";
import {Possibilities} from "./Possibilities/Possibilities.jsx";
import {TopReviews} from "./TopReviews/TopReviews.jsx";
import {Layout} from "../../components/Layout.jsx";
import {Contacts} from "../../components/Contacts/Contacts.jsx";
import {CategoryProducts} from "../Catalog/CategoryProducts.jsx";
import {CategoryWithProducts} from "./CategoryWithProducts/CategoryWithProducts.jsx";

export const HomePage = () => {
  return (
    <Layout>
      <CategoryWithProducts/>
      <TopReviews/>
      <PopularQuestions/>
      <Original/>
      <Possibilities/>
      <DeliverySection/>
      <Guarantees/>
      <Contacts/>
    </Layout>
  )
}