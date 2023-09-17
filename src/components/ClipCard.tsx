import { AspectRatio, Flex, Image, Text, Title } from "@mantine/core";
import Dayjs from "dayjs";

const ClipCard = ({ clip }: any) => {
  // https://minbird.kr/static/videos/processed/clips/thumbnail/sP5siZsXKp4.jpg
  const thumbnailUrl = `https://minbird.kr/static/videos/processed/clips/thumbnail/${clip.id}.jpg`;

  return (
    <div>
      <AspectRatio ratio={16 / 9}>
        <Image src={thumbnailUrl} alt={clip.cn} radius={"md"} />
      </AspectRatio>
      <Title order={4} mt={4} lineClamp={1}>
        {clip.cn}
      </Title>
      <Flex gap={5}>
        <Text size="sm">
          {Dayjs(clip.data?.created_at).format("YYYY-MM-DD")}
        </Text>
        <Text size="sm">{clip.data?.Game}</Text>
      </Flex>
    </div>
  );
};

export default ClipCard;
