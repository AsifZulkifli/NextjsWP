import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const res = await fetch("https://gamudagardens.digitalsymphony.it/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "DigitalSymphonyNextApp/1.0",
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    const raw = await res.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { message: raw || "Invalid response from upstream server" },
        { status: 500 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Request failed" },
        { status: res.status }
      );
    }

    if (data?.errors?.length) {
      return NextResponse.json(
        { message: data.errors[0].message || "GraphQL error" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Server fetch failed" },
      { status: 500 }
    );
  }
}