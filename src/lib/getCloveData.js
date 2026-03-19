export async function getCloveData() {
  const query = `
    query GetCloveData {
      page(id: "the-clove", idType: URI) {
        id
        title
        clovePageFields {
          hero_title
          merqueeItems
          herovideo {
            node {
              mediaItemUrl
              mimeType
            }
          }
          sectionLogo {
            node {
              sourceUrl
            }
          }
          sectionHeading
          sectionDescription
        }
      }

      theCloves(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes {
          id
          title
          slug
          content
          propertyFields {
            subtitle
            description
            price
            monthlyprice
            image {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(process.env.WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "DigitalSymphonyNextApp/1.0",
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text}`);
  }

  if (!res.ok) {
    throw new Error(json?.message || `HTTP ${res.status}`);
  }

  if (json?.errors?.length) {
    throw new Error(json.errors[0].message || "GraphQL error");
  }

  return json.data;
}