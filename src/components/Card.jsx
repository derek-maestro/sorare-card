import {
  Wrapper,
  CardSection,
  DetailSection,
  RoundedBox
} from "./Card.components";

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
