import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "../components/Card";
import { CARD_QUERY } from "../queries/Card.query";

import dummyData from "./data.json";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Button = styled.button`
  background: #2c3a80;
  border-radius: 4px;
  text-decoration: none;
  text-shadow: none;
  border: none;
  box-shadow: none;
  padding: 18px 40px;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

const CardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slugs: slugsFromUrl } = useParams();
  const slugs = slugsFromUrl.split(",").map((s) => s.trim());

  const loadCardFromQuery = async (slug) => {
    const res = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: CARD_QUERY,
        variables: {
          slug
        }
      })
    });

    const {
      data: { card }
    } = await res.json();

    return card;
  };

  const loadCards = async () => {
    setLoading(true);
    await Promise.all(slugs.map((slug) => loadCardFromQuery(slug))).then(
      (cards) => {
        setCards(cards);
      }
    );
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        {cards.length
          ? cards.map((card) => <Card card={card} key={card.id} />)
          : slugs.map((slug) => (
              <Card card={dummyData} blur={true} loading={loading} key={slug} />
            ))}
      </Wrapper>

      <Button onClick={loadCards}>Reveal Cards</Button>
    </>
  );
};

export default CardsPage;
