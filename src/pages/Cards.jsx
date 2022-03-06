import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Card from "../components/Card";
import { CARD_QUERY } from "../queries/Card.query";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 30px;
  width: 100%;
`;

const Placeholder = styled.div`
  padding: 20px;
  display: flex;
  height: 120px;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #f1f0f5;
  background: #fff;
  border-radius: 8px;
  text-align: left;
  margin-bottom: 10px;
  cursor: pointer;
  text-transform: capitalize;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;

  :hover {
    font-weight: bold;
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

  if (loading) return <LoadingWrapper>Loading...</LoadingWrapper>;

  return (
    <Wrapper>
      {cards.length ? (
        cards.map((card) => <Card card={card} key={card.id} />)
      ) : (
        <>
          {slugs.map((slug) => (
            <Placeholder key={slug}>{slug.replaceAll("-", " ")}</Placeholder>
          ))}

          <div>
            <Button onClick={loadCards}>LOAD CARDS</Button>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default CardsPage;
