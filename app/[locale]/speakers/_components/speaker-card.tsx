import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";
import { Box, Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speakerSessions: SpeakerSessions;
}

export function SpeakerCard({ speakerSessions }: SpeakerCardProps) {
  const { speaker, sessions } = speakerSessions;

  return (
    <Card role="listitem">
      <CardHeader>
        <CardTitle as="h2">{speaker}</CardTitle>
      </CardHeader>

      <CardContent>
        <Flex direction="column" gap="2" role="list">
          {sessions.map((session) => (
            <Box key={session.id} role="listitem">
              <Link
                href={`/sessions/${session.id}`}
                aria-label={`${session.title}, ${session.startTime}`}
              >
                <Text
                  fontWeight="medium"
                  color="var(--text-primary)"
                  _hover={{ textDecoration: "underline" }}
                >
                  {session.title}
                </Text>
                <Text fontSize="sm" color="var(--text-muted)">
                  {session.startTime}
                </Text>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
