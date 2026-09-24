import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakerSessions = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Every speaker at the conference, and the sessions they&apos;re giving.
      </PageHeading>

      <Grid
        gap="6"
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        role="list"
      >
        {speakerSessions.map((entry) => (
          <SpeakerCard key={entry.speaker} speakerSessions={entry} />
        ))}
      </Grid>
    </Flex>
  );
}
