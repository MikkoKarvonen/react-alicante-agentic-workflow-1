import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speakerSessions: SpeakerSessions;
}

export function SpeakerCard({ speakerSessions }: SpeakerCardProps) {
  const { speaker, sessions } = speakerSessions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{speaker}</CardTitle>
      </CardHeader>

      <CardContent>
        <Flex direction="column" gap="2">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
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
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
