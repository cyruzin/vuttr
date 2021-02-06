import { useEffect, useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toolsSchema } from '../../validations/tools';

import httpRequest from '../../util/request';
import useDebounce from '../../hooks/useDebounce';

import { Input, Checkbox, Button, Card, Modal } from '../../components';

interface ToolsState {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

const Tools = () => {
  const [currentTools, setCurrentTools] = useState<ToolsState[]>([]);
  const [withTag, setWithTag] = useState(false);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const getTools = useCallback(async () => {
    try {
      setError('');
      const response = await httpRequest('/tools', {
        method: 'GET',
      });
      setCurrentTools(response);
    } catch (error) {
      setError(error);
    }
  }, []);

  const searchTools = async (searchTerm: string, withTags = false) => {
    setError('');

    const toolsURL = `/tools?q=${searchTerm}`;
    const toolsWithTagsURL = `/tools?tags_like=${searchTerm}`;
    const url = withTags ? toolsWithTagsURL : toolsURL;

    try {
      const response = await httpRequest(url, {
        method: 'GET',
      });
      setCurrentTools(response);
    } catch (error) {
      setError(error);
    }
  };

  const searchHandler = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') return getTools();

    if (withTag) {
      return searchTools(value, withTag);
    }

    return searchTools(value);
  }, 800);

  const tagsHandler = () => {
    setWithTag(!withTag);
  };

  const initialToolState = {
    title: '',
    link: '',
    description: '',
    tags: '',
  };

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(toolsSchema),
    mode: 'onBlur',
    defaultValues: initialToolState,
  });

  const onSubmit = async (data: any) => {
    try {
      setError('');

      await httpRequest('/tools', {
        method: 'POST',
        body: data,
      });

      getTools();
      setOpenModal(false);
      reset(initialToolState);
    } catch (error) {
      setError(error);
    }
  };

  const removeToolHandler = async (id: number) => {
    try {
      setError('');
      await httpRequest(`/tools/${id}`, {
        method: 'DELETE',
      });
      getTools();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getTools();
  }, [getTools]);

  return (
    <div style={{ position: 'relative' }}>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
            marginLeft: 30,
            marginTop: 20,
          }}
        >
          <Input name="search" placeholder="Search tools" onChange={searchHandler} />
          {error !== '' && <p>Something went wrong</p>}
          <Checkbox
            id="tags"
            name="tags"
            value="Tags"
            label="search in tags only"
            isChecked={withTag}
            onChange={tagsHandler}
          />
          <Button style={{ marginLeft: 5 }} onClick={() => setOpenModal(true)}>
            Add
          </Button>
        </div>

        <Modal
          isOpen={openModal}
          title="Add new tool"
          onCancel={() => {
            setOpenModal(false);
            reset(initialToolState);
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name="title" placeholder="Tool title" ref={register} />
            <p>{errors.title?.message}</p>
            <Input name="link" placeholder="Tool link" ref={register} />
            <p>{errors.link?.message}</p>
            <Input
              name="description"
              placeholder="Tool description"
              ref={register}
            />
            <p>{errors.description?.message}</p>
            <Input name="tags" placeholder="Tool tags" ref={register} />
            <p>{errors.tags?.message}</p>

            <Button type="submit">Add tool</Button>
          </form>
        </Modal>
        <div
          style={{
            marginLeft: 30,
          }}
        >
          {currentTools.length > 0 &&
            currentTools.map((tool) => (
              <Card
                key={tool.id}
                id={tool.id}
                title={tool.title}
                link={tool.link}
                description={tool.description}
                tags={tool.tags}
                onRemove={removeToolHandler}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
