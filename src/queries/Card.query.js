export const CARD_QUERY = `
  query card($slug: String!) {
    card(slug: $slug) {
      id
      name
      age
      pictureUrl
      player {
        id
        displayName
        activeClub {
          name
          pictureUrl
          code
          slug
        }
        pictureUrl
        position
        slug
      }
      power
      priceRange {
        min
        max
      }
      season {
        id
        name
        startYear
      }
      slug
    }
  }
`;
