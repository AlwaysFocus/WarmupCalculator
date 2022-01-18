interface Props {
    exercise: string;
    workingSetWeight: number;
}

interface Set {
    weight: number;
    reps: number;
}

interface Warmup {
    warmup: Set[];
}

export default function CalculateSets(props: Props): Warmup {
    const {exercise, workingSetWeight} = props;
    let sets = Array<Set>();

    switch (exercise) {
        case "bench":
            sets.push({weight: 45, reps: 5});
            sets.push({weight: 45, reps: 5});
            sets.push({weight: workingSetWeight * 0.45, reps: 5});
            sets.push({weight: workingSetWeight * 0.65, reps: 3});
            sets.push({weight: workingSetWeight * 0.85, reps: 2});
            break;
        case "squat":
            sets.push({weight: 45, reps: 5});
            sets.push({weight: 45, reps: 5});
            sets.push({weight: workingSetWeight * 0.45, reps: 5});
            sets.push({weight: workingSetWeight * 0.65, reps: 3});
            sets.push({weight: workingSetWeight * 0.85, reps: 2});
            break;
        case "deadlift":
            sets.push({weight: 135, reps: 5});
            sets.push({weight: workingSetWeight * 0.45, reps: 5});
            sets.push({weight: workingSetWeight * 0.65, reps: 3});
            sets.push({weight: workingSetWeight * 0.85, reps: 2});
            break;

    }

    return {warmup: [...sets]};

}