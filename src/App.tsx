import React, { MouseEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classes from './App.module.scss';
import InputComponent from './components/input';
import ButtonComponent from './components/button';
import Column from './components/column';
import { columnWithTasksSelector } from './store/selectors';
import { createTasks, dropTasks, getTasks } from './store/tasks/taskActions';
import { getColumns } from './store/columns/columnActions';

const validationSchema = yup.object({
    taskText: yup.string().trim().required('inputs.error'),
});

const App: React.FC = () => {
    const dispatch = useDispatch();
    const columns = useSelector(columnWithTasksSelector);

    const { t, i18n } = useTranslation();

    const getColumn = useEffect(() => {
        dispatch(getColumns());
    }, []);

    const getTask = useEffect(() => {
        dispatch(getTasks());
    }, []);

    const onAddTask = (text: string) => {
        dispatch(createTasks(text));
    };

    const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
        useFormik({
            initialValues: {
                taskText: '',
            },
            validationSchema,
            onSubmit: (formValues, { resetForm }) => {
                onAddTask(formValues.taskText);
                resetForm();
            },
        });

    const changeLanguage = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            i18n.changeLanguage(e.currentTarget.value);
        },
        [i18n]
    );

    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId) {
            return;
        }

        dispatch(
            dropTasks(
                draggableId,
                destination.droppableId,
                source.droppableId,
                source.index,
                destination.index
            )
        );
    };
    const columnsElements = columns.map((column) => (
        <Column
            name={column.name}
            key={column._id}
            id={column._id}
            tasks={column.tasks}
        />
    ));

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={classes.app}>
                <div className={classes.language}>
                    <ButtonComponent
                        value="en"
                        type="button"
                        onClick={changeLanguage}
                    />
                    <ButtonComponent
                        value="ru"
                        type="button"
                        onClick={changeLanguage}
                    />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={classes['add-container']}
                >
                    <InputComponent
                        placeholder={t('inputs.enterTask')}
                        id="taskText"
                        name="taskText"
                        value={values.taskText}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.taskText && Boolean(errors.taskText)}
                        helperText={t(`${errors.taskText || ''}`)}
                    />
                    <ButtonComponent
                        type="submit"
                        value={t('buttons.addTask')}
                    />
                </form>
                <div className={classes['columns-container']}>
                    {columnsElements}
                </div>
            </div>
        </DragDropContext>
    );
};

export default App;
