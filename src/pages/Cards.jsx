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

const CardsPage = () => {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      setLoading(false);
      setCard(card);
    };
    fetchData();
  }, [slug]);

  if (loading) return <LoadingWrapper>Loading...</LoadingWrapper>

  return <Card card={card} />;
};

export default CardsPage;
