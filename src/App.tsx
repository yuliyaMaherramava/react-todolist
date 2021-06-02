import React, { MouseEvent } from 'react';
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
import { addTask, dropTask } from './store/actions';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const columns = useSelector(columnWithTasksSelector);
    const { t, i18n } = useTranslation();

    const changeLanguage = (e: MouseEvent<HTMLButtonElement>) => {
        i18n.changeLanguage(e.currentTarget.value);
    };

    const onAddTask = (text: string) => {
        dispatch(addTask(text));
    };

    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId) {
            return;
        }
        dispatch(
            dropTask({
                destionationId: destination.droppableId,
                sourceId: source.droppableId,
                draggableId,
            })
        );
    };

    const columnsElements = columns.map((column) => (
        <Column
            name={column.name}
            key={column.id}
            id={column.id}
            tasks={column.tasks}
        />
    ));

    const validationSchema = yup.object({
        taskText: yup.string().trim().required(),
    });
    const formik = useFormik({
        initialValues: {
            taskText: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const text = JSON.stringify(values.taskText).replace(/"/g, '');
            onAddTask(text);
            resetForm();
        },
    });
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={classes.app}>
                <div className={classes.language}>
                    <ButtonComponent value="en" onClick={changeLanguage} />
                    <ButtonComponent value="ru" onClick={changeLanguage} />
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className={classes['add-container']}
                >
                    <InputComponent
                        placeholder={t('inputs.enterTask')}
                        id="taskText"
                        name="taskText"
                        value={formik.values.taskText}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.taskText &&
                            Boolean(formik.errors.taskText)
                        }
                    />
                    <ButtonComponent value={t('buttons.addTask')} />
                </form>
                <div className={classes['columns-container']}>
                    {columnsElements}
                </div>
            </div>
        </DragDropContext>
    );
};

export default App;
