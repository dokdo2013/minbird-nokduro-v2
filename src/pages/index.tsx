import ClipCard from "@/components/ClipCard";
import { HeaderResponsive } from "@/components/Header";
import { useGetClips } from "@/fetchers/get-clips";
import { Button, Container, Flex, Loader, SimpleGrid } from "@mantine/core";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const router = useRouter();
  const { p } = router.query;
  const [ref, inView] = useInView();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const { data: apiData, error, isLoading } = useGetClips(page, perPage);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!apiData) return;
    setData([...data, ...(apiData as any)] as any);
  }, [apiData]);

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
      console.log("inView", page);
    }
  }, [inView]);

  // useEffect(() => {
  //   if (p) {
  //     setPage(Number(p));
  //   } else {
  //     setPage(1);
  //   }
  // }, [p]);

  return (
    <div>
      <HeaderResponsive
        links={[
          {
            link: "/",
            label: "Home",
          },
        ]}
      />

      {isLoading ? (
        <Flex justify={"center"} my={20}>
          <Loader />
        </Flex>
      ) : (
        <Container size={"lg"} mt={40}>
          <SimpleGrid
            cols={4}
            spacing={24}
            mb={100}
            breakpoints={[
              { maxWidth: 1140, cols: 4, spacing: "md" },
              { maxWidth: 1000, cols: 4, spacing: "md" },
              { maxWidth: 840, cols: 2, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {data?.map((clip: any) => {
              const url = `https://minbird.kr/clipmaker/nokduro/view?c=${clip.id}`;

              return (
                <a href={url} key={clip.id} target="_blank" rel="noreferrer">
                  <ClipCard clip={clip} />
                </a>
              );
            })}
          </SimpleGrid>

          <div ref={ref} />

          {/* <Button
            color="violet"
            variant="outline"
            onClick={() => {
              router.push(`/?p=${page + 1}`);
            }}
          >
            다음 페이지
          </Button> */}
        </Container>
      )}
    </div>
  );
}
