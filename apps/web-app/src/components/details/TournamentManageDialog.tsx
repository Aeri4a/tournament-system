import {
  createTournamentSchema,
  TournamentFormData,
} from '@/zod/createTournament';
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UpdateTournamentDto } from 'common';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useUpdateTourMutation } from '@/api/tournamentApi';

interface TournamentManageDialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
  location: string;
  time: string;
  deadline: string;
  maxParticipants: number;
  id: number;
}

const TournamentManageDialog: FC<TournamentManageDialogProps> = ({
  open,
  onClose,
  name,
  location,
  time,
  deadline,
  maxParticipants,
  id,
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TournamentFormData>({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      name,
      location,
      time,
      deadline,
      maxParticipants,
      sponsorLogos: '',
    },
    mode: 'onTouched',
  });

  const updateTourMutation = useUpdateTourMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: TournamentFormData) => {
    const updatedTournament: UpdateTournamentDto = {
      id,
      locationAddress: data.location,
      maxParticipants: data.maxParticipants,
      name: data.name,
      startTime: data.time,
      registrationDeadline: data.deadline,
    };

    if (data.sponsorLogos && data.sponsorLogos.length > 0) {
      updatedTournament.sponsorLogoUrls = data.sponsorLogos.split(',');
    }

    updateTourMutation.mutate(updatedTournament, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tournamentDetails'] });
        handleClose();
        // TODO: tost here
        console.log('created successfully tournament');
      },
    });
  };

  return (
    <>
      <Dialog.Root size={'lg'} open={open}>
        <Dialog.Trigger />
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Edit</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack
                onSubmit={handleSubmit(onSubmit)}
                as="form"
                id="update-tournament"
              >
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>Name</Field.Label>
                  <Input
                    id="name"
                    // placeholder="Name"
                    size="lg"
                    {...register('name')}
                  />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.location}>
                  <Field.Label>Location</Field.Label>
                  <Input
                    id="location"
                    // placeholder="Location"
                    size="lg"
                    {...register('location')}
                  />
                  <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.time}>
                  <Field.Label>Start time</Field.Label>
                  <Input
                    id="location"
                    type="date"
                    // placeholder="Start time"
                    size="lg"
                    {...register('time')}
                  />
                  <Field.ErrorText>{errors.time?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.deadline}>
                  <Field.Label>Registration deadline</Field.Label>
                  <Input
                    id="deadline"
                    type="date"
                    // placeholder="Registration deadline"
                    size="lg"
                    {...register('deadline')}
                  />
                  <Field.ErrorText>{errors.deadline?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.maxParticipants}>
                  <Field.Label>Max participants</Field.Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    // placeholder="Max participants"
                    size="lg"
                    {...register('maxParticipants', { valueAsNumber: true })}
                  />
                  <Field.ErrorText>
                    {errors.maxParticipants?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.sponsorLogos}>
                  <Field.Label>
                    Sponsor logo urls (separate by comma)
                  </Field.Label>
                  <Input
                    id="sponsorLogos"
                    // placeholder="Max participants"
                    size="lg"
                    {...register('sponsorLogos')}
                  />
                  <Field.ErrorText>
                    {errors.sponsorLogos?.message}
                  </Field.ErrorText>
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  type="submit"
                  form="update-tournament"
                  loading={isSubmitting}
                >
                  Save
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={handleClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default TournamentManageDialog;
