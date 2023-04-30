import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
  } from '@mantine/core';
import { motion } from 'framer-motion';
  import { TbChevronRight} from "react-icons/tb"
  
  const useStyles = createStyles((theme) => ({
    user: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        flexWrap: "nowrap",
        whiteSpace:"nowrap",
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      },
    },
  }));
  
  interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
    openNavState: boolean;
  }
  
  export function UserButton({ image, name, email, icon, openNavState, ...others }: UserButtonProps) {
    const { classes } = useStyles();
  
    return (
      <UnstyledButton className={classes.user} {...others}>
        <Group sx={{flexWrap: "nowrap"}}>
          <Avatar src={image} radius="xl" />
  
            {openNavState && 
            <> 
            
                <motion.div style={{ flex: 1 }} initial={{opacity: 0}} animate={{ opacity: 1}} transition={{delay: 0.1}}>
                    <Text size="sm" weight={500}>
                    {name}
                    </Text>
        
                    <Text color="dimmed" size="xs">
                    {email}
                    </Text>
                </motion.div>

                {icon || 
                <motion.div initial={{opacity: 0}} animate={{ opacity: 1}}transition={{delay: 0.1}} >
                    <TbChevronRight size="0.9rem" />
                </motion.div>
                }
            
            </>}
        </Group>
      </UnstyledButton>
    );
  }