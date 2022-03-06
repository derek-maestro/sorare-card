import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CardSection = styled.div`
  height: 460px;
  width: 100%;
  display: flex;
  padding: 20px;
  position: relative;
  background: linear-gradient(138.79deg, #303030 0%, #000 100%);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  .image-wrapper {
    width: 200px;
    z-index: 0;
    position: relative;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const DetailSection = styled.div`
  margin: auto;
  padding: 50px 40px 90px 40px;
  max-width: 1280px;
  width: 100%;

  .section-title {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.01em;
    text-align: left;

    color: #0d0c11;
    margin: 20px 0px;
  }

  .personal-info {
    display: flex;
    align-items: center;
    margin-bottom: 52px;
    flex-direction: col;
    justify-content: space-between;

    h4 {
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: -0.02em;
    }
  }

  .related-pages {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    width: calc(100% + 20px);
    margin: -10px;
  }
`;

const RoundedBox = styled.div`
  flex-grow: 0;
  max-width: 100%;
  flex-basis: 100%;
  padding: 10px;

  @media (min-width: 960px) {
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
  }

  a {
    display: flex;
    padding: 0 30px;
    height: 120px;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid #f1f0f5;
    background: #fff;
    border-radius: 8px;
    text-decoration: none;
    text-align: left;

    p {
      font-size: 15px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
      margin: 0;

      :last-of-type {
        color: #6E737C;
      }
    }
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
`;

const Card = ({ card }) => {
  if (!card) return;
  return (
    <Wrapper>
      <CardSection>
        <div className="image-wrapper">
          <img src={card.pictureUrl} draggable={false} alt={card.name} />
        </div>
      </CardSection>
      {card.player && (
        <DetailSection>
          <h6 className="section-title">Personal Info</h6>
          <div className="personal-info">
            <h4>
              <a href={`/players/${card.player.slug}`}>
                {card.player.displayName}
              </a>
            </h4>
          </div>

          <h6 className="section-title">Related pages</h6>
          <div className="related-pages">
            <RoundedBox>
              <a href={`/players/${card.player.slug}`}>
                <div className="avatar">
                  <img
                    src={card.player.pictureUrl}
                    alt={card.player.displayName}
                  />
                </div>
                <div>
                  <p>{card.player.displayName}</p>
                  <p>{card.player.position}</p>
                </div>
              </a>
            </RoundedBox>
            <RoundedBox>
              <a href={`/clubs/${card.player.activeClub.slug}`}>
                <div className="avatar">
                  <img
                    src={card.player.activeClub.pictureUrl}
                    alt={card.player.activeClub.name}
                  />
                </div>
                <div>
                  <p>{card.player.activeClub.name}</p>
                  <p>{card.player.activeClub.code}</p>
                </div>
              </a>
            </RoundedBox>
          </div>
        </DetailSection>
      )}
    </Wrapper>
  );
};

export default Card;
