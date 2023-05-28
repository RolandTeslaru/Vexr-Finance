import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
  Skeleton,
} from "@mantine/core";
import Image from "next/image";
import {
  TbPlus,
  TbDiscount2,
  TbReceipt2,
  TbCoin,
  TbArrowUpRight,
  TbArrowDownRight,
} from "react-icons/tb";
import { ICoin } from "../Trending/Trending";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    margin: 0,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: TbPlus,
  discount: TbDiscount2,
  receipt: TbReceipt2,
  coin: TbCoin,
};

interface StatsGridProps {
  data?: {
    title: string;
    icon: keyof typeof icons;
    value: string;
    diff: number;
  }[];
  isSkeleton?: boolean;
  coin: ICoin;
}

export function CoinCard({ data, isSkeleton, coin }: StatsGridProps) {
  const { classes } = useStyles();

  let stats;
  if (isSkeleton) {
    // Show skeleton when data is loading
    return (
      <div className={classes.root}>
        <Paper withBorder p="md" radius="md" w={"250px"}>
          <Group position="apart">
            <Skeleton variant="rectangular" height={30} />

          </Group>

          <Group align="flex-end" spacing="xs" mt={25}>
            <Skeleton variant="rectangular" height={40} width={100} />
          </Group>

          <Group spacing="md" p="md">
            <Skeleton variant="rectangular" height={10} width={100} />
          </Group>
        </Paper>
      </div>
    );
  } else if (data) {
    stats = data.map((stat) => {
      const Icon = icons[stat.icon];
      const DiffIcon = stat.diff > 0 ? TbArrowUpRight : TbArrowDownRight;

      return (
        <Paper withBorder p="md" radius="md" key={stat.title} w={"250px"}>
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              <Image
                src={coin.item.small}
                width={20}
                height={20}
                alt={coin.item.name}
              ></Image>
              &nbsp; &nbsp;
              {stat.title}
            </Text>
            <Icon className={classes.icon} size="1.4rem" />
          </Group>

          <Group align="flex-end" spacing="xs" mt={25}>
            <Text className={classes.value}>{505}</Text>
            <Text
              color={stat.diff > 0 ? "teal" : "red"}
              fz="sm"
              fw={500}
              className={classes.diff}
            >
              <span>{stat.diff}%</span>
              <DiffIcon size="1rem" />
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Compared to previous month
          </Text>
        </Paper>
      );
    });
  }

  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
